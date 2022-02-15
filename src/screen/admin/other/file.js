import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { toast } from 'react-toastify';
import axios from 'axios';

import RowMenu from '../../../components/row/rowMenu';
import { Btn, ColorBtn } from '../../../components/btns/btns';
import Input from '../../../components/inputs/input';
import FileItem from '../../../components/admin/file';
import Search from '../../../components/inputs/search';
import InputFile from '../../../components/inputs/inputFile';

const Divver = styled.div`
    margin-top: 16px;
`

const CreateLink = (props) => {
    const [isLoading, setLoading] = useState(false);
    const { t } = useTranslation('translation')

    const onSubmit = async (data) => {
        if (!isLoading) {
            try {
                setLoading(true)
                const res1 = await instance.post(`/static`, {
                    path: props.path,
                    uploadFile: props.uploadFile.type,
                });
                await axios.put(res1.data.uploadURL, props.uploadFile, {
                    headers: {
                        "Content-Type": props.uploadFile.type || 'application/octet-stream'
                    }
                })
                setLoading(false)
                props.setUploadFile(null)
                props.setPath('')
                toast.info('링크를 생성/업데이트 했습니다.')
                props.updateUrl()
            } catch (err) {
                setLoading(false)
                if (err.response) {
                    if (err.response.data.code === "user_not_found") {
                        toast.error(t('err_user_not_found'))
                    } else if (err.response.data.code === "token_expired") {
                        toast.error(t('err_token_expired'))
                    } else if (err.response.data.code === "invalid_token") {
                        toast.error(t('err_invalid_token'))
                    } else if (err.response.data.code === "wrong_password") {
                        toast.error(t('err_wrong_password'))
                    } else {
                        toast.error(err.message)
                        console.error(err.response)
                    }
                } else {
                    toast.error(err.message)
                    console.error(err)
                }
            }
        }
    };

    const deleteRedirect = async (data) => {
        if (!isLoading && window.confirm('정말로 삭제하실건가요?')) {
            try {
                setLoading(true)
                await instance.delete(`/static?path=${props.path}`);
                setLoading(false)
                props.setPath('')
                props.setUploadFile(null)
                toast.info('파일를 삭제 했습니다.')
                props.updateUrl()
            } catch (err) {
                setLoading(false)
                if (err.response) {
                    if (err.response.data.code === "user_not_found") {
                        toast.error(t('err_user_not_found'))
                    } else if (err.response.data.code === "token_expired") {
                        toast.error(t('err_token_expired'))
                    } else if (err.response.data.code === "invalid_token") {
                        toast.error(t('err_invalid_token'))
                    } else if (err.response.data.code === "wrong_password") {
                        toast.error(t('err_wrong_password'))
                    } else {
                        toast.error(err.message)
                        console.error(err.response)
                    }
                } else {
                    toast.error(err.message)
                    console.error(err)
                }
            }
        }
    };

    return (
        <RowMenu name={'파일'} marginTop={16}>
            {/* <Input value={props.uploadFile || ""} onChange={e => props.setUploadFile(e.target.value)} placeholder='파일' /> */}
            <InputFile title="파일" setUploadFile={props.setUploadFile} uploadFile={props.uploadFile}/>
            <Input value={props.path || ""} onChange={e => props.setPath(e.target.value)} placeholder='파일 이름' />
            <ColorBtn isLoading={isLoading} text='추가' onClick={onSubmit} />
            <Btn isLoading={isLoading} text='삭제' onClick={deleteRedirect} background="var(--red1)" backgroundHover="var(--red2)" color="var(--red9)" />
        </RowMenu>
    )
}

const UrlsDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
`

export default function Create(props) {
    const [ uploadFile, setUploadFile ] = useState({})
    const [ path, setPath ] = useState("")
    const [ urls, setUrls ] = useState([])
    const [ searchText, setSearchText ] = useState('')

    const { t } = useTranslation('translation')

    const updateUrl = useCallback(async () => {
        try {
            const res = await instance.get('/static')
            setUrls(res.data.fileList.Contents)
        } catch (err) {
            if (err.response) {
                if (err.response.data.code === "user_not_found") {
                    toast.error(t('err_user_not_found'))
                } else if (err.response.data.code === "token_expired") {
                    toast.error(t('err_token_expired'))
                } else if (err.response.data.code === "invalid_token") {
                    toast.error(t('err_invalid_token'))
                } else if (err.response.data.code === "wrong_password") {
                    toast.error(t('err_wrong_password'))
                } else {
                    toast.error(err.message)
                    console.error(err.response)
                }
            } else {
                toast.error(err.message)
                console.error(err)
            }
        }
    }, [t])

    useEffect(() => {
        setPath(uploadFile?.name)
    }, [uploadFile?.name])

    useEffect(() => {
        (async () => {
            await updateUrl()
        })()
    }, [updateUrl])

    return (
        <Divver>
            <CreateLink path={path} setPath={setPath} updateUrl={updateUrl} uploadFile={uploadFile} setUploadFile={setUploadFile} />
            <Search value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <UrlsDiv>
                {
                    urls.filter(e => {
                        if (searchText === "") return true
                        if (e.Key.toUpperCase().includes(searchText.toUpperCase())) return true
                        return false
                    }).map((e, i) => <FileItem key={i} {...e} onClick={() => {
                        setPath(e.Key)
                    }} />)
                }
            </UrlsDiv>
        </Divver>
    )
}