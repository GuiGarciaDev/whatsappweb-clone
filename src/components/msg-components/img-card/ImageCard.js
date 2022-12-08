import './style.scss';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

import DropMenu from '../../dropdown/dropmenu/DropMenu';

import { BsCheckAll } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';

export default function ImageCard({ el, id, chatId }) { 
    const lastMessageRef = useRef()
    const { currentUser } = useAuth()
    const [modalDelete, setModalDelete] = useState(false); // Modal for delete specific message
    const [dropdown, setDropdown] = useState(false);
    const dropdownId = 'dd' + id;

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    return (
        <div id={el.id} className="image-card"  key={id}
        style={el.autor === currentUser.email 
            ? {alignSelf: 'flex-end', borderRadius: '10px 0 10px 10px'} 
            : {alignSelf: 'flex-start', borderRadius: '0 10px 10px 10px'}}
        ref={lastMessageRef}
        >
            <div className='image-card-content'>
                <img src={el.photoUrl ?? el.photoUrl}></img>
                <label style={el.autor === currentUser.email ? {right: '-12px'} : {left: '-12px', transform: 'scale(-1, 1)'}}/>
            </div>
            <div className='time'>
                <span id='image-card-time' >{el.time}</span>
                {
                    el.autor === currentUser.email 
                    ? <BsCheckAll style={el.isRead ? {color: "#53bdeb"} : {color: "white", opacity: "0.6"}}/> 
                    : <></>
                }
            </div>
            <>
                <button className='image-card-dropbutton' onClick={() => setDropdown(dropdownId)} 
                    style={ dropdown ? {display: "flex", opacity: '1'} : {}}
                >
                <IoIosArrowDown className='downArrow'/>
                </button>
                <DropMenu 
                    el={el} chatId={chatId}
                    classname={'image-card-dropdown'} toggler={dropdown}
                    order={() => setDropdown()} id={dropdownId}
                    owner={el.autor === currentUser.email}
                />
            </>
            
        </div>
    )
}