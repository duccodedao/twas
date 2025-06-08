import { JettonBalance } from "@ton-api/client";
import { JettonItem } from "./JettonItem";

interface JettonListProps {
  jettons: JettonBalance[] | null;
  connectedAddressString: string | null;
  onSendClick: (jetton: JettonBalance) => void;
  className?: string;
}

export const JettonList = ({ jettons, connectedAddressString, onSendClick, className }: JettonListProps) => {
  return (
    <div className={className}>
      <h2>Danh sách Jetton</h2>
      {connectedAddressString ? (
        <div>
          {jettons && jettons.length ? (
            jettons.map((jettonBalance) => (
              <JettonItem key={jettonBalance.jetton.address.toString()} jettonBalance={jettonBalance} onSendClick={onSendClick} />
            ))
          ) : (
            <p>Không tìm thấy Jetton</p>
          )}
        </div>
      ) : (
        <p>Kết nối ví!</p>
      )}
    </div>
  );
};