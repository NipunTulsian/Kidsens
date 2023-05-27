import React from 'react'
import Navbar from './CommonNavbar'
import { useNavigate } from 'react-router'
import Tree from 'react-d3-tree';
function StagesPage() {
    const navigate = useNavigate();
    const [data, setData] = React.useState({
        name:"abc"
    })
    React.useEffect(() => {
        if (!localStorage.getItem('User')) {
            navigate('/')
        }
        getData()
    }, [])
    const myTreeConfig = {
        nodeSize: {
          x: 200,
          y: 100,
        },
        translate: {
          x: 900,
          y: 40,
        }
      };
    const getData = async () => {
        const serverRes = await fetch("http://localhost:8000/get-tree", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer".concat(" ", localStorage.getItem("User")),
            },
            body: JSON.stringify({
                id: localStorage.getItem("User")
            })
        })

        if (serverRes.status === 200) {
            const serverResJson = await serverRes.json();
            let forms= serverResJson.forms
            let stages = serverResJson.stages
            let assess=  serverResJson.assess
            let maps= serverResJson.maps
            let obj = {
                name:"Default",
                children:[]
            }
            for(let i=0;i<stages.length;i++)
            {
                let obj_stage= {
                    name:stages[i]["stage"],
                    children:[]
                }
                obj.children.push(obj_stage)
                for(let j=0;j<assess.length;j++)
                {
                    if(assess[j]["stage"]==stages[i]["stage"])
                    {
                        let obj_assess={
                            name:assess[j]["assessment"],
                            children:[]
                        }
                        obj_stage.children.push(obj_assess)
                        for(let k=0;k<maps.length;k++)
                        {
                            if(maps[k]["stage"]==stages[i]["stage"]&& maps[k]["assessment"]==assess[j]["assessment"])
                            {
                                for(let l=0;l<forms.length;l++)
                                {
                                    console.log(forms)
                                    if(forms[l]["FORM_ID"]== maps[k]["FORM_ID"])
                                    {
                                        obj_assess.children.push({
                                            name:forms[l]["FORM_NAME"]
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }
            setData(obj)
        }
    }
    return (
        <div>
            <Navbar pageTitle="Default Workflow" />
            <div id="treeWrapper" style={{ width: '100vw', height: '100vh' , 'fontSize':'10px'}}>
                <Tree data={data} orientation="vertical" zoomable={true} {...myTreeConfig}/>
            </div>
        </div>
    )
}

export default StagesPage