import React, {useState} from "react";
import {useStore} from "../store/store";
import Input from "./Input";
import {Button, Icon} from "semantic-ui-react";
import {observer} from "mobx-react-lite";

interface Props {
    id: string
    ids: {parent: '', child: []}
}

export default observer(function Modifiers({id, ids}: Props) {
    const {productStore} = useStore()
    const {setModifiers} = productStore

    const [inputList, setInputList] = useState([])
    const [inc, setInc] =useState(0)
    function handleAddOption(id: string) {
        setInc(inc+1)
        Object.keys(ids).forEach((e, i) => {
            // @ts-ignore
            if(Object.keys(ids[i]).length > 0) {
                // @ts-ignore
                if(ids[e].parent === id) {
                    // @ts-ignore
                    ids[e].child.push(`${id}_child_${inc}`)
                    setModifiers(`${id}_child_${inc}`)
                }
            }
        })

        // @ts-ignore
        setInputList(inputList.concat(<Input key={id + inc} placeholder='option' name={`${id}_child_${inc}`}/>));
    }

    return (
        <>
            <Input placeholder='modifier' name={id} />
            <Button
                type='button'
                icon
                labelPosition='left'
                size='tiny'
                onClick={() => handleAddOption(id)}
            >
                <Icon name='add' /> Add Option
            </Button>
            {inputList}
            <hr />
        </>
    )
})