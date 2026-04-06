import { FaEye } from "react-icons/fa6";
import ReusableTable from "../../../../../components/common/ReusableTable";
import ActionButton from "../../../../../components/common/ActionButton";
import { CircleCheck, LoaderCircle, CircleX } from "lucide-react";

export default function TransaksiTable({ data, onView, loading }) {
  const columns = [
    { title: "No", dataIndex: "no", center: true, width: "60px" },

    { title: "Nama Pengguna", dataIndex: "nama", width: "220px" },

    {
      title: "Tanggal",
      dataIndex: "tanggal",
      center: true,
    },

    { title: "Total", dataIndex: "total", center: true },

    {
      title: "Status",
      center: true,
      render: (row) => {
        const statusMap = {
          PAID: { icon: CircleCheck, color: "#21A366", text: "Lunas" },
          UNPAID: { icon: LoaderCircle, color: "#EFB700", text: "Belum Bayar" },
          FAILED: { icon: CircleX, color: "#D62828", text: "Gagal" },
          EXPIRED: { icon: CircleX, color: "#D62828", text: "Kadaluarsa" },
          REFUND: { icon: CircleX, color: "#D62828", text: "Refund" },
        };

        const current = statusMap[row.status?.toUpperCase()] || statusMap["UNPAID"];

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

    { title: "Jenis Paket", dataIndex: "paket", className: "whitespace-normal" },
    {
      title: "Aksi",
      center: true,
      render: (item) => (
        <ActionButton
          onClick={() => onView(item)}
          icon={FaEye}
          color="#007BFF"
          hoverBg="#E7F1FF"
          size={17}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoaderCircle className="animate-spin" size={32} color="#AA494E" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">Tidak ada data transaksi</p>
      </div>
    );
  }

  return <ReusableTable columns={columns} data={data} />;
}