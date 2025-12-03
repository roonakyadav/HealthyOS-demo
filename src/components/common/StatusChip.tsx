interface StatusChipProps {
    status: string;
}

export default function StatusChip({ status }: StatusChipProps) {
    const colorMap = {
        Completed: 'bg-green-100 text-green-800',
        Scheduled: 'bg-blue-100 text-blue-800',
        Cancelled: 'bg-red-100 text-red-800',
    };

    const colorClass = colorMap[status as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';

    return (
        <span className={`inline-flex px-2 py-1 text-sm font-medium rounded-full capitalize ${colorClass}`}>
            {status}
        </span>
    );
}
