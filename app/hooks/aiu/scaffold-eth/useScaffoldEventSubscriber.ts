import { Abi, ExtractAbiEventNames } from "abitype";
import { Log } from "viem";
import { useContractEvent } from "wagmi";
import { addIndexedArgsToEvent, useDeployedContractInfo } from "@/app/hooks/aiu/scaffold-eth";
import { getTargetNetwork } from "@/app/utils/scaffold-eth";
import { ContractAbi, ContractName, UseScaffoldEventConfig } from "@/app/utils/scaffold-eth/contract";

/**
 * @dev wrapper for wagmi's useContractEvent
 * @param config - The config settings
 * @param config.contractName - deployed contract name
 * @param config.eventName - name of the event to listen for
 * @param config.listener - the callback that receives events. If only interested in 1 event, call `unwatch` inside of the listener
 */
export const useScaffoldEventSubscriber = <
    TContractName extends ContractName,
    TEventName extends ExtractAbiEventNames<ContractAbi<TContractName>>,
>({
    contractName,
    eventName,
    listener,
}: UseScaffoldEventConfig<TContractName, TEventName>) => {
    const { data: deployedContractData } = useDeployedContractInfo(contractName);

    const addInexedArgsToLogs = (logs: Log[]) => logs.map(addIndexedArgsToEvent);
    const listenerWithIndexedArgs = (logs: Log[]) =>
        listener(addInexedArgsToLogs(logs) as Parameters<typeof listener>[0]);

    return useContractEvent({
        address: deployedContractData?.address,
        abi: deployedContractData?.abi as Abi,
        chainId: getTargetNetwork().id,
        listener: listenerWithIndexedArgs,
        eventName,
    });
};
