import React, {useEffect, useState} from 'react'
import {Button, Grid, Header} from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import {Cropper} from "react-cropper";
import PhotoCropper from "./PhotoCropper";
import {observer} from "mobx-react-lite";

interface Props {
    uploading: boolean,
    uploadImage: (file: Blob | null) => void
}

function PhotoWidget({uploading, uploadImage}: Props) {
    const [files, setFiles] = useState<any>([])
    const [cropper, setCropper] = useState<Cropper>()

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadImage(blob))
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 1 - Add image'/>
                <PhotoWidgetDropzone setFiles={setFiles}/>
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 2 - Resize image'/>
                {files && files.length > 0 && (
                    // <Image src={files[0].preview}/>
                    <PhotoCropper setCropper={setCropper} imagePreview={files[0].preview}/>
                )}
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 1 - Preview & Upload'/>
                {
                    files && files.length > 0 &&
                    <>
                        <div className='img-preview' style={{minHeight: '200px', overflow: 'hidden'}}/>
                        <Button.Group size='small' widths={2} style={{marginTop: '15px'}}>
                            <Button type='button' disabled={uploading} loading={uploading} onClick={onCrop} positive icon='check'/>
                            <Button type='button' onClick={() => {
                                setFiles([])
                            }} negative icon='close'/>
                        </Button.Group>
                    </>
                }
            </Grid.Column>
        </Grid>
    )
}

export default observer(PhotoWidget);