import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {Icon, Header} from "semantic-ui-react";

interface Props {
    setFiles: (files: any) => void
}

function PhotoWidgetDropzone({setFiles}: Props) {
    const dzStyle = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingBottom: '30px',
        textAlign: 'center' as 'center',
        height: '200px'
    }

    const dzActiveStyle = {
        borderColor: 'green'
    }

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} style={isDragActive ? {...dzStyle, ...dzActiveStyle} : dzStyle }>
            <input name='img' {...getInputProps()} />
            <Icon style={{marginTop: '15%'}} name='upload' size='huge' />
            <Header content='Drop Image here' />
        </div>
    )
}

export default PhotoWidgetDropzone