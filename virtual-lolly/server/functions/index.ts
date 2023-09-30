import addLolly from './addLolly';

import getLollies from './getLolly';

import Lolly from './lolly';

type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        lollyId: string,
        lolly:Lolly;
    }
}

exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {

        case "addLolly":
            return await addLolly(event.arguments.lolly);
        case "getLollies":
            return await getLollies();
        default:
            return null;
    }
}