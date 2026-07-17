import { supabase } from "../config/supabase";
import { ConflictError, DatabaseError, NotFoundError } from "../utils/AppError";

import { UploadDocumentDto } from "../validators/documentSchema";

export async function uploadDocument(uploadedBy: string, payload: UploadDocumentDto) {
  /*
  --------------------------------------------------------------------------
  Verify Application
  --------------------------------------------------------------------------
  */

  const { data: application, error: applicationError } = await supabase
    .from("applications")
    .select(
      `
        *,
        candidate:candidates(
          id,
          name,
          email
        ),
        employer:employers(
          id,
          company_name
        )
      `,
    )
    .eq("id", payload.application_id)
    .single();

  if (applicationError || !application) {
    throw new NotFoundError("Application not found.");
  }

  /*
  --------------------------------------------------------------------------
  Candidate Validation
  --------------------------------------------------------------------------
  */

  if (application.candidate_id !== payload.candidate_id) {
    throw new ConflictError("Candidate does not belong to this application.");
  }

  /*
  --------------------------------------------------------------------------
  Duplicate Document Check
  --------------------------------------------------------------------------
  */

  const { data: duplicate } = await supabase
    .from("documents")
    .select("id,status,version")
    .eq("application_id", payload.application_id)
    .eq("document_type", payload.document_type)
    .order("version", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (duplicate && duplicate.status !== "reupload_required") {
    throw new ConflictError(`${payload.document_type} already uploaded.`);
  }

  /*
  --------------------------------------------------------------------------
  Version
  --------------------------------------------------------------------------
  */

  const version = duplicate?.version ? duplicate.version + 1 : 1;

  /*
  --------------------------------------------------------------------------
  Upload Document Metadata
  --------------------------------------------------------------------------
  */

  const { data: document, error } = await supabase
    .from("documents")
    .insert({
      application_id: payload.application_id,

      candidate_id: payload.candidate_id,

      employer_id: payload.employer_id,

      job_order_id: payload.job_order_id,

      uploaded_by: uploadedBy,

      document_type: payload.document_type,

      file_name: payload.file_name,

      original_file_name: payload.original_file_name,

      mime_type: payload.mime_type,

      file_size: payload.file_size,

      storage_path: payload.storage_path,

      public_url: payload.public_url,

      expires_at: payload.expires_at,

      metadata: payload.metadata ?? {},

      version,

      status: "pending",
    })
    .select()
    .single();

  if (error) {
    throw new DatabaseError("Unable to upload document.", error);
  }

  /*
  --------------------------------------------------------------------------
  Document History
  --------------------------------------------------------------------------
  */

  await supabase.from("document_history").insert({
    document_id: document.id,

    action: "uploaded",

    new_status: "pending",

    remarks: "Document uploaded.",

    performed_by: uploadedBy,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: payload.candidate_id,

    title: "Document Uploaded",

    message: `${payload.document_type.replaceAll("_", " ")} uploaded successfully.`,

    type: "document",

    related_entity: "document",

    related_entity_id: document.id,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (payload.employer_id) {
    await supabase.from("notifications").insert({
      user_id: payload.employer_id,

      title: "New Document Uploaded",

      message: `${application.candidate.name} uploaded ${payload.document_type.replaceAll("_", " ")}.`,

      type: "document",

      related_entity: "document",

      related_entity_id: document.id,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: uploadedBy,

    action: "Document Uploaded",

    entity: "document",

    entity_id: document.id,

    metadata: {
      application_id: payload.application_id,

      document_type: payload.document_type,

      version,
    },
  });

  /*
  --------------------------------------------------------------------------
  Return Complete Document
  --------------------------------------------------------------------------
  */

  const { data: result } = await supabase
    .from("documents")
    .select(
      `
        *,
        candidate:candidates(
          id,
          name
        ),
        employer:employers(
          id,
          company_name
        ),
        application:applications(
          id,
          internal_status
        )
      `,
    )
    .eq("id", document.id)
    .single();

  return result;
}

import { ReplaceDocumentDto } from "../validators/documentSchema";

export async function replaceDocument(
  documentId: string,
  uploadedBy: string,
  payload: ReplaceDocumentDto,
) {
  /*
  --------------------------------------------------------------------------
  Existing Document
  --------------------------------------------------------------------------
  */

  const { data: existing, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .single();

  if (error || !existing) {
    throw new NotFoundError("Document not found.");
  }

  /*
  --------------------------------------------------------------------------
  Only Reupload Requested
  --------------------------------------------------------------------------
  */

  if (existing.status !== "reupload_required") {
    throw new ConflictError("This document cannot be replaced.");
  }

  /*
  --------------------------------------------------------------------------
  Archive Previous Version
  --------------------------------------------------------------------------
  */

  const { error: archiveError } = await supabase
    .from("documents")
    .update({
      updated_at: new Date().toISOString(),
    })
    .eq("id", documentId);

  if (archiveError) {
    throw new DatabaseError("Unable to archive previous document.", archiveError);
  }

  /*
  --------------------------------------------------------------------------
  Create New Version
  --------------------------------------------------------------------------
  */

  const { data: document, error: insertError } = await supabase
    .from("documents")
    .insert({
      application_id: existing.application_id,

      candidate_id: existing.candidate_id,

      employer_id: existing.employer_id,

      job_order_id: existing.job_order_id,

      uploaded_by: uploadedBy,

      document_type: existing.document_type,

      file_name: payload.file_name,

      original_file_name: payload.original_file_name,

      mime_type: payload.mime_type,

      file_size: payload.file_size,

      storage_path: payload.storage_path,

      public_url: payload.public_url,

      expires_at: payload.expires_at,

      metadata: payload.metadata ?? {},

      version: existing.version + 1,

      status: "pending",
    })
    .select()
    .single();

  if (insertError) {
    throw new DatabaseError("Unable to upload replacement document.", insertError);
  }

  /*
  --------------------------------------------------------------------------
  Document History
  --------------------------------------------------------------------------
  */

  await supabase.from("document_history").insert({
    document_id: document.id,

    action: "reuploaded",

    old_status: existing.status,

    new_status: "pending",

    remarks: "Replacement document uploaded.",

    performed_by: uploadedBy,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: existing.candidate_id,

    title: "Document Reuploaded",

    message: `${existing.document_type.replaceAll("_", " ")} has been uploaded again.`,

    type: "document",

    related_entity: "document",

    related_entity_id: document.id,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (existing.employer_id) {
    await supabase.from("notifications").insert({
      user_id: existing.employer_id,

      title: "Replacement Document Uploaded",

      message: "Candidate uploaded the corrected document.",

      type: "document",

      related_entity: "document",

      related_entity_id: document.id,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: uploadedBy,

    action: "Document Reuploaded",

    entity: "document",

    entity_id: document.id,

    metadata: {
      previous_document: existing.id,

      version: document.version,
    },
  });

  /*
  --------------------------------------------------------------------------
  Return
  --------------------------------------------------------------------------
  */

  return document;
}

export async function approveDocument(documentId: string, adminId: string, remarks?: string) {
  /*
  --------------------------------------------------------------------------
  Fetch Document
  --------------------------------------------------------------------------
  */

  const { data: document, error } = await supabase
    .from("documents")
    .select(
      `
      *,
      application:applications(
        id,
        candidate_id,
        employer_id,
        internal_status
      )
    `,
    )
    .eq("id", documentId)
    .single();

  if (error || !document) {
    throw new NotFoundError("Document not found.");
  }

  /*
  --------------------------------------------------------------------------
  Already Approved
  --------------------------------------------------------------------------
  */

  if (document.status === "approved") {
    throw new ConflictError("Document has already been approved.");
  }

  /*
  --------------------------------------------------------------------------
  Update Document
  --------------------------------------------------------------------------
  */

  const { data: updatedDocument, error: updateError } = await supabase
    .from("documents")
    .update({
      status: "approved",
      verified_by: adminId,
      verified_at: new Date().toISOString(),
      rejection_reason: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", documentId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to approve document.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Document History
  --------------------------------------------------------------------------
  */

  await supabase.from("document_history").insert({
    document_id: documentId,
    action: "approved",
    old_status: document.status,
    new_status: "approved",
    remarks,
    performed_by: adminId,
  });

  /*
  --------------------------------------------------------------------------
  Check Remaining Documents
  --------------------------------------------------------------------------
  */

  const { data: remaining } = await supabase
    .from("documents")
    .select("id")
    .eq("application_id", document.application.id)
    .neq("status", "approved");

  /*
  --------------------------------------------------------------------------
  All Documents Approved
  --------------------------------------------------------------------------
  */

  if (!remaining || remaining.length === 0) {
    await supabase
      .from("applications")
      .update({
        internal_status: "medical",
        last_status_change: new Date().toISOString(),
      })
      .eq("id", document.application.id);

    await supabase.from("application_status_history").insert({
      application_id: document.application.id,
      status: "medical",
      changed_by: adminId,
      remarks: "All required documents approved.",
    });
  }

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: document.application.candidate_id,
    title: "Document Approved",
    message: `${document.document_type.replaceAll("_", " ")} has been approved.`,
    type: "document",
    related_entity: "document",
    related_entity_id: documentId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (document.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: document.application.employer_id,
      title: "Document Approved",
      message: `${document.document_type.replaceAll("_", " ")} approved successfully.`,
      type: "document",
      related_entity: "document",
      related_entity_id: documentId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,
    action: "Document Approved",
    entity: "document",
    entity_id: documentId,
    metadata: {
      application_id: document.application.id,
      document_type: document.document_type,
    },
  });

  return updatedDocument;
}

export async function rejectDocument(documentId: string, adminId: string, reason: string) {
  /*
  --------------------------------------------------------------------------
  Fetch Document
  --------------------------------------------------------------------------
  */

  const { data: document, error } = await supabase
    .from("documents")
    .select(
      `
      *,
      application:applications(
        id,
        candidate_id,
        employer_id,
        internal_status
      )
    `,
    )
    .eq("id", documentId)
    .single();

  if (error || !document) {
    throw new NotFoundError("Document not found.");
  }

  /*
  --------------------------------------------------------------------------
  Validation
  --------------------------------------------------------------------------
  */

  if (document.status === "approved") {
    throw new ConflictError("Approved documents cannot be rejected.");
  }

  if (document.status === "reupload_required") {
    throw new ConflictError("Document is already waiting for re-upload.");
  }

  /*
  --------------------------------------------------------------------------
  Reject Document
  --------------------------------------------------------------------------
  */

  const { data: updatedDocument, error: updateError } = await supabase
    .from("documents")
    .update({
      status: "reupload_required",

      verified_by: adminId,

      verified_at: new Date().toISOString(),

      rejection_reason: reason,

      updated_at: new Date().toISOString(),
    })
    .eq("id", documentId)
    .select()
    .single();

  if (updateError) {
    throw new DatabaseError("Unable to reject document.", updateError);
  }

  /*
  --------------------------------------------------------------------------
  Document History
  --------------------------------------------------------------------------
  */

  await supabase.from("document_history").insert({
    document_id: documentId,

    action: "rejected",

    old_status: document.status,

    new_status: "reupload_required",

    remarks: reason,

    performed_by: adminId,
  });

  /*
  --------------------------------------------------------------------------
  Candidate Notification
  --------------------------------------------------------------------------
  */

  await supabase.from("notifications").insert({
    user_id: document.application.candidate_id,

    title: "Document Requires Re-upload",

    message: `${document.document_type.replaceAll("_", " ")} requires correction. Reason: ${reason}`,

    type: "document",

    related_entity: "document",

    related_entity_id: documentId,
  });

  /*
  --------------------------------------------------------------------------
  Employer Notification
  --------------------------------------------------------------------------
  */

  if (document.application.employer_id) {
    await supabase.from("notifications").insert({
      user_id: document.application.employer_id,

      title: "Document Rejected",

      message: `${document.document_type.replaceAll("_", " ")} has been rejected and requires re-upload.`,

      type: "document",

      related_entity: "document",

      related_entity_id: documentId,
    });
  }

  /*
  --------------------------------------------------------------------------
  Activity Log
  --------------------------------------------------------------------------
  */

  await supabase.from("activity_logs").insert({
    user_id: adminId,

    action: "Document Rejected",

    entity: "document",

    entity_id: documentId,

    metadata: {
      application_id: document.application.id,

      document_type: document.document_type,

      rejection_reason: reason,
    },
  });

  return updatedDocument;
}

export async function downloadDocument(documentId: string, userId: string) {
  /*
  --------------------------------------------------------------------------
  Fetch Document
  --------------------------------------------------------------------------
  */

  const { data: document, error } = await supabase
    .from("documents")
    .select(
      `
      *,
      application:applications(
        candidate_id,
        employer_id
      )
    `,
    )
    .eq("id", documentId)
    .single();

  if (error || !document) {
    throw new NotFoundError("Document not found.");
  }

  /*
  --------------------------------------------------------------------------
  Authorization
  --------------------------------------------------------------------------
  */

  const allowedUsers = [
    document.application.candidate_id,
    document.application.employer_id,
    document.uploaded_by,
    document.verified_by,
  ].filter(Boolean);

  if (!allowedUsers.includes(userId)) {
    throw new ConflictError("You do not have permission to access this document.");
  }

  /*
  --------------------------------------------------------------------------
  Return Document
  --------------------------------------------------------------------------
  */

  return {
    id: document.id,
    document_type: document.document_type,
    file_name: document.file_name,
    mime_type: document.mime_type,
    file_size: document.file_size,
    public_url: document.public_url,
    storage_path: document.storage_path,
  };
}

export async function getDocument(documentId: string) {
  const { data, error } = await supabase
    .from("documents")
    .select(
      `
      *,

      candidate:candidates(
        id,
        name,
        email
      ),

      employer:employers(
        id,
        company_name
      ),

      application:applications(
        id,
        internal_status
      ),

      job_order:job_orders(
        id,
        title
      )
    `,
    )
    .eq("id", documentId)
    .single();

  if (error || !data) {
    throw new NotFoundError("Document not found.");
  }

  const { data: history } = await supabase
    .from("document_history")
    .select(
      `
      id,
      action,
      old_status,
      new_status,
      remarks,
      performed_by,
      created_at
    `,
    )
    .eq("document_id", documentId)
    .order("created_at", {
      ascending: false,
    });

  return {
    ...data,
    history: history ?? [],
  };
}

interface ListDocumentFilters {
  page?: number;
  limit?: number;

  applicationId?: string;

  candidateId?: string;

  employerId?: string;

  jobOrderId?: string;

  status?: string;

  type?: string;
}

export async function listDocuments(filters: ListDocumentFilters = {}) {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;

  let query = supabase.from("documents").select(
    `
      *,

      candidate:candidates(
        id,
        name
      ),

      employer:employers(
        id,
        company_name
      ),

      application:applications(
        id,
        internal_status
      ),

      job_order:job_orders(
        id,
        title
      )
      `,
    {
      count: "exact",
    },
  );

  if (filters.applicationId) {
    query = query.eq("application_id", filters.applicationId);
  }

  if (filters.candidateId) {
    query = query.eq("candidate_id", filters.candidateId);
  }

  if (filters.employerId) {
    query = query.eq("employer_id", filters.employerId);
  }

  if (filters.jobOrderId) {
    query = query.eq("job_order_id", filters.jobOrderId);
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.type) {
    query = query.eq("document_type", filters.type);
  }

  query = query
    .order("created_at", {
      ascending: false,
    })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    data,

    pagination: {
      page,

      limit,

      total: count ?? 0,

      totalPages: Math.ceil((count ?? 0) / limit),
    },
  };
}
