interface Props {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="py-12 text-center">
      <h3 className="font-semibold">{title}</h3>

      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
