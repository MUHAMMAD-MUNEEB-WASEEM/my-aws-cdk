import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import Iframe from './Iframe';
import { identityContext } from '../context/authContext';

const GET_PANELS = "https://0ie94ovk74.execute-api.us-east-1.amazonaws.com/prod/grafana_saas_panels";

const Monitor = ({ id }) => {
    const [loading, setLoading] = useState(true);
    const [orgId, setOrg] = useState("");
    const [panels, setPanels] = useState([]);
    const { user, authState } = useContext(identityContext)
    const [dashboard, setDashboard] = useState("");

    console.log("USER", user);

    const get_panels = async () => {
        try{
            const panel = await axios.post(GET_PANELS, {
                type: "lambda",
                apiId: id
            })
            console.log(panel);
            setOrg(panel?.data?.org_id)
            setPanels(panel?.data?.dashboard?.panels)
            setDashboard(panel?.data?.dashboard?.uid)
            setLoading(false)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        get_panels();
    }, []);

    return (
        <div>
            {
                !loading
                ?
                <>
                    {
                        user?.username && panels?.length > 0 && panels?.map((panel: any) => (
                            <Iframe source={`https://0xbkqyp72m.execute-api.us-east-1.amazonaws.com/d-solo/${dashboard}/lambda-meter?orgId=${orgId}&refresh=30s&from=1613968074180&to=1614011274181&panelId=${panel?.id}&mode=${user?.username}`}/>
                        ))
                    }
                </>
                :
                    <h2>Loading ....</h2>
            }
        </div>
    )
}

export default Monitor
