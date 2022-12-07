import './style.scss';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

import DropMenu from '../../dropmenu/DropMenu';

import { AiFillCamera, BsCheckAll, IoIosArrowDown, HiDocument } from '../../../icons'
import { getRepliedMsg } from '../../../API';

export default function RepCard({ el, id, chatId }) { 
    const lastMessageRef = useRef()
    const { currentUser } = useAuth()
    const [dropdown, setDropdown] = useState(false);
    const [repliedMessage, setRepliedMessage] = useState([]);
    const dropdownId = 'dd' + id;

    useEffect(() => {
        async function setRepState() {
            const repMessage = await getRepliedMsg(el.repId, chatId)
            setRepliedMessage(repMessage)
        }
    
        setRepState()
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    return (
        <>
            <div id={el.id} className="rep-card" 
            style={el.autor === currentUser.email 
                ? {alignSelf: 'flex-end', borderRadius: '10px 0 10px 10px'} 
                : {alignSelf: 'flex-start', borderRadius: '0 10px 10px 10px'}} 
            ref={lastMessageRef}
            >
                <div className='rep-message'>
                    <span></span>
                    <div className='autorContent'>
                        <p className='autor'>{repliedMessage.autor  === currentUser.email ? 'Você' : repliedMessage.autor}</p>
                        <div>
                        { repliedMessage.type === 'img'
                            ? <p><AiFillCamera/>Foto</p>
                            : (repliedMessage.type === ('pdf') || repliedMessage.type === 'doc')
                                ? <div className='file-description'><HiDocument/>{`${repliedMessage.fileName}`}</div>
                                : <p>{repliedMessage.content}</p>
                        }
                        </div>
                    </div>
                    { repliedMessage.type === 'img' 
                        ? <img src={repliedMessage.photoUrl}></img>
                        : <></>
                    }
                </div>

                <div className='message-card-content'>
                    <p>{el.content}</p>
                    <label style={el.autor === currentUser.email ? {right: '-12px'} : {left: '-12px', transform: 'scale(-1, 1)'}}/>
                </div>

                <div className='time' style={!(el.autor === currentUser.email) ? {right: '0px'} : {right: '-9px'}}>
                    <span id='message-card-time' >{el.time}</span>
                    {
                        el.autor === currentUser.email 
                        ? <BsCheckAll style={el.isRead ? {color: "#53bdeb"} : {color: "white", opacity: "0.6"}}/> 
                        : <></>
                    }
                </div>
                
                {
                    <>
                        <button className='message-card-dropbutton' onClick={() => setDropdown(dropdownId)} 
                            style={ dropdown ? {display: "flex", opacity: '1'} : {}}
                        >
                        <IoIosArrowDown className='downArrow'/>
                        </button>
                        <DropMenu 
                            el={el} chatId={chatId}
                            classname={'message-card-dropdown'} toggler={dropdown}
                            order={() => setDropdown()} id={dropdownId}
                            owner={el.autor === currentUser.email}
                        />
                    </>
                }
            </div>
        </>
    )
}