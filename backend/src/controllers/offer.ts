import { Request, Response } from "express";

import * as OfferService from "../services/offer";

import {
  CreateOfferSchema,
  SendOfferSchema,
  AcceptOfferSchema,
  RejectOfferSchema,
  WithdrawOfferSchema,
} from "../validators/offerSchema";

/*
|--------------------------------------------------------------------------
| TEMP USER IDS
|--------------------------------------------------------------------------
| Replace with req.user after authentication
*/

const DEMO_ADMIN_ID = "00000000-0000-0000-0000-000000000002";

const DEMO_CANDIDATE_ID = "00000000-0000-0000-0000-000000000001";

/*
|--------------------------------------------------------------------------
| CREATE OFFER
|--------------------------------------------------------------------------
*/

export async function createOffer(req: Request, res: Response) {
  try {
    const parsed = CreateOfferSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await OfferService.createOffer(DEMO_ADMIN_ID, parsed.data);

    return res.status(201).json({
      success: true,
      message: "Offer created successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to create offer.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| SEND OFFER
|--------------------------------------------------------------------------
*/

export async function sendOffer(req: Request, res: Response) {
  try {
    const parsed = SendOfferSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await OfferService.sendOffer(String(req.params.id), DEMO_ADMIN_ID, parsed.data);

    return res.json({
      success: true,
      message: "Offer sent successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to send offer.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| ACCEPT OFFER
|--------------------------------------------------------------------------
*/

export async function acceptOffer(req: Request, res: Response) {
  try {
    const parsed = AcceptOfferSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await OfferService.acceptOffer(
      String(req.params.id),
      DEMO_CANDIDATE_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Offer accepted successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to accept offer.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| REJECT OFFER
|--------------------------------------------------------------------------
*/

export async function rejectOffer(req: Request, res: Response) {
  try {
    const parsed = RejectOfferSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await OfferService.rejectOffer(
      String(req.params.id),
      DEMO_CANDIDATE_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Offer rejected successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to reject offer.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| WITHDRAW OFFER
|--------------------------------------------------------------------------
*/

export async function withdrawOffer(req: Request, res: Response) {
  try {
    const parsed = WithdrawOfferSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.flatten(),
      });
    }

    const data = await OfferService.withdrawOffer(
      String(req.params.id),
      DEMO_ADMIN_ID,
      parsed.data,
    );

    return res.json({
      success: true,
      message: "Offer withdrawn successfully.",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to withdraw offer.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| GET OFFER
|--------------------------------------------------------------------------
*/

export async function getOffer(req: Request, res: Response) {
  try {
    const data = await OfferService.getOffer(String(req.params.id));

    return res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message ?? "Offer not found.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| LIST OFFERS
|--------------------------------------------------------------------------
*/

export async function listOffers(req: Request, res: Response) {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 20;

    const data = await OfferService.listOffers({
      page,
      limit,
      employerId: req.query.employerId as string,
      candidateId: req.query.candidateId as string,
      applicationId: req.query.applicationId as string,
      jobOrderId: req.query.jobOrderId as string,
      status: req.query.status as string,
    });

    return res.json({
      success: true,
      ...data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message ?? "Unable to fetch offers.",
    });
  }
}
