import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { Cluster, StreamClient } from '@streamflow/stream';
import { useEffect, useState } from 'react';

import { StreamsTableComponent } from '@components/pages/streams/Table';

export function StreamsPage() {
  const [data, setData] = useState(() => []);
  const { connection } = useConnection();
  const { wallet } = useWallet();

  useEffect(() => {
    if (wallet?.adapter.publicKey) {
      getData();
    }
  }, [wallet?.adapter.publicKey]);

  const getData = async () => {
    const streamClient = new StreamClient(connection.rpcEndpoint, Cluster.Devnet, 'confirmed');

    try {
      const streams = await streamClient.get({
        wallet: wallet?.adapter.publicKey as PublicKey,
      });

      let tableData: any = [];

      streams.map((stream) => {
        tableData.push({ id: stream[0], contract: stream[1] });
      });

      setData(tableData);
    } catch (exception) {
      console.log(exception);
    }
  };

  return <StreamsTableComponent data={data} getRowCanExpand={() => true} />;
}
