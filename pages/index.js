// One-page site for selling an EA Robot via USDT (TRC20) pay-per-download

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EARobotPayDownload() {
  const [paymentDone, setPaymentDone] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [txId, setTxId] = useState('');
  const [error, setError] = useState('');

  const walletAddress = 'TFJt7YsWUKb3To8UfBmx55ZWpUMoDdRvAo'; // Updated USDT TRC20 wallet address
  const amount = 123;

  const checkTransaction = async () => {
    if (!txId) {
      setError('Please enter your transaction ID.');
      return;
    }
    setError('');
    setCheckingPayment(true);

    try {
      const response = await fetch(`https://apilist.tronscanapi.com/api/transaction-info?hash=${txId}`);
      const data = await response.json();

      if (!data || !data.contractType) {
        throw new Error('Transaction not found or incomplete.');
      }

      const contractType = data.contractType;

      if (contractType === 31) {
        const recipient = data.contractData.to_address;
        const amountTransferred = parseFloat(data.contractData.amount_str) / 1e6;
        const tokenInfo = data.tokenInfo;

        const isUSDT = tokenInfo?.tokenAbbr === 'USDT';
        const isCorrectAmount = amountTransferred === amount;
        const isToYou = recipient === walletAddress;

        if (isUSDT && isCorrectAmount && isToYou) {
          setPaymentDone(true);
        } else {
          throw new Error('USDT payment details incorrect.');
        }
      } else {
        throw new Error('Only USDT (TRC20) payments are accepted.');
      }

    } catch (err) {
      setError(err.message || 'Failed to verify transaction.');
    } finally {
      setCheckingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <Card className="max-w-xl w-full">
        <CardContent className="space-y-6 p-6">
          <h1 className="text-3xl font-bold text-center">Buy Expert Advisor (E.A.) Robot</h1>
          <p className="text-center text-gray-600">
            Send exactly <strong>123 USDT (TRC20)</strong> to this wallet:
          </p>
          <code className="block bg-gray-200 p-2 rounded text-center text-blue-600">{walletAddress}</code>

          {!paymentDone ? (
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Enter your transaction ID:</label>
                <input
                  type="text"
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your USDT Transaction ID"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button onClick={checkTransaction} disabled={checkingPayment} className="w-full">
                {checkingPayment ? 'Verifying Payment...' : 'Verify & Get Download Link'}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <p className="text-green-600 font-bold">Payment confirmed!</p>
              <a
                href="/downloads/ea-robot.zip"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
                download
              >
                Download E.A. Robot
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}