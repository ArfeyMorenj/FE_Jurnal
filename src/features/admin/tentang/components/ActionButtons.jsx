import Button from "../../../../components/common/Button";
import { BUTTON_STYLES } from '../constants/tentangConstants';

const ActionButtons = ({ onCancel, onSave, loading, cancelText = "Kembali", saveText = "Simpan" }) => {
    return (
        <div className="flex justify-end gap-3">
            <Button
                type="button"
                className={BUTTON_STYLES.CANCEL}
                onClick={onCancel}
            >
                {cancelText}
            </Button>
            <Button
                type="button"
                className={BUTTON_STYLES.SAVE}
                onClick={onSave}
                disabled={loading}
            >
                {loading ? "Menyimpan..." : saveText}
            </Button>
        </div>
    );
};

export default ActionButtons;
