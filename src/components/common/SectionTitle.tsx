interface SectionTitleProps {
    title: string;
    subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && (
                <p className="mt-1 text-gray-600">{subtitle}</p>
            )}
        </div>
    );
}
