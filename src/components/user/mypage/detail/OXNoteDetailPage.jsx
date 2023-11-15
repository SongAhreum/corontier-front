import axios from 'axios';
import React, { useEffect, useState } from 'react'

function OXNoteDetailPage() {
  const [note,setNote] =useState([]);

  const getNote=async()=>{
    const res = await axios.get(`/mypage/oxnotedetail.list?user_id=${sessionStorage.getItem('user_id')}`);
    setNote(res.data.list);
  }

  useEffect(()=>{
    getNote();
  },[])
    
    return (
      <div className='allmypage_wrap'>
        <div className='allmypage_wrap'>
          <div className='allmypage_title'>
            <p>오답노트 수정하기</p>
          </div>
          <div className='allmypage_contents'>
          {note.map(n=>
            <>
              <div className='oxnotedetailpage_contents'>
                {n.problem_id}
              </div>
            </>
          )}
          </div>
        </div>
      </div>
    )
}

export default OXNoteDetailPage