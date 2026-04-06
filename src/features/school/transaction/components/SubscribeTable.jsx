import { FaEye } from "react-icons/fa6";
import ReusableTable from "../../../../components/common/ReusableTable";
import ActionButton from "../../../../components/common/ActionButton";
import { CircleCheck, CircleX, CircleHelp } from "lucide-react";

export default function SubscribeTable({ data, onView }) {
  const columns = [
    { title: "No", dataIndex: "no", center: true, width: "60px" },

    { title: "Nama Paket", dataIndex: "paket", className: "whitespace-normal" },

    {
      title: "Tanggal Berlangganan",
      dataIndex: "start_date",
      center: true,
      render: (row) => {
        if (!row.start_date) return "-";
        
        try {
          return new Date(row.start_date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });
        } catch {
          return row.start_date;
        }
      },
    },

    {
      title: "Tanggal Berakhir",
      dataIndex: "end_date",
      center: true,
      render: (row) => {
        if (!row.end_date) return "-";
        
        try {
          return new Date(row.end_date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });
        } catch {
          return row.end_date;
        }
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      center: true,
      render: (row) => {
        const statusMap = {
          aktif: { icon: CircleCheck, color: "#21A366", text: "Aktif" },
          expired: { icon: CircleX, color: "#D62828", text: "Expired" },
          active: { icon: CircleCheck, color: "#21A366", text: "Aktif" },
          inactive: { icon: CircleX, color: "#D62828", text: "Tidak Aktif" },
          paid: { icon: CircleCheck, color: "#21A366", text: "Aktif" },
          unpaid: { icon: CircleX, color: "#D62828", text: "Belum Dibayar" },
        };

        const statusKey = row.status ? row.status.toLowerCase() : "unknown";
        const current = statusMap[statusKey] || { 
          icon: CircleHelp, 
          color: "#6B7280", 
          text: row.status || "Unknown" 
        };

        return (
          <span
            className="flex items-center justify-center gap-1 text-[12px] font-medium px-2 py-1 rounded-full"
            style={{ color: current.color }}
          >
            <current.icon size={14} />
            {current.text}
          </span>
        );
      },
    },

    {
      title: "Aksi",
      center: true,
      render: (item) => (
        <ActionButton
          onClick={() => onView(item.reference)}
          icon={FaEye}
          color="#007BFF"
          hoverBg="#E7F1FF"
          size={17}
        />
      ),
    },
  ];

  return <ReusableTable columns={columns} data={data} />;
}