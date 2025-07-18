import { useState } from "react";
import { JettonBalance } from "@ton-api/client";
import { toDecimals } from "../utils/decimals";
import { Address } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { getJettonTransaction } from "../utils/jetton-transfer";

interface SendJettonModalProps {
  jetton: JettonBalance;
  senderAddress: Address;
  onClose: () => void;
}

export const SendJettonModal = ({
  jetton,
  senderAddress,
  onClose,
}: SendJettonModalProps) => {
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [tonConnectUI] = useTonConnectUI();

  const handleSubmit = () => {
    try {
      const transaction = getJettonTransaction(
        jetton,
        amount,
        recipientAddress,
        senderAddress
      );

      tonConnectUI
        .sendTransaction(transaction)
        .then(() => {
          setError(null);
          onClose();
        })
        .catch((e) => setError(e.message || "Transaction failed"));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Gửi {jetton.jetton.name}</h2>
        {error && <p className="error">{error}</p>}
        <label>
          Địa chỉ ví nhận:
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Enter recipient address"
          />
        </label>
        <label>
          Số lượng:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Enter the amount (up to ${toDecimals(
              jetton.balance,
              jetton.jetton.decimals
            )})`}
          />
        </label>
        <button onClick={handleSubmit}>Gửi</button>
        <button onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
};
