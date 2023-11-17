import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'react-bootstrap';

function OXNoteDetailPage() {
  // const [note,setNote] =useState([]);

  // const getNote=async()=>{
  //   const res = await axios.get(`/mypage/oxnotedetail.list?user_id=${sessionStorage.getItem('user_id')}`);
  //   setNote(res.data.list);
  // }

  // useEffect(()=>{
  //   getNote();
  // },[])
    
    return (
      <div className='allmypage_wrap'>
        <div className='allmypage_wrap'>
          <div className='allmypage_title'>
            <p>[1번] A+B</p>
          </div>
          <div className='allmypage_contents'>
            <div className='oxnotedetailpage_contents'>
              <Card>
                <CardHeader className='oxnotedetailpage_cardheader'>
                  <Row>
                    <Col className='oxnotedetailpage_cardheader_col'><strong>번호</strong></Col>
                    <Col className='oxnotedetailpage_cardheader_col'><strong>언어</strong></Col>
                    <Col className='oxnotedetailpage_cardheader_col'><strong>정답</strong></Col>
                    <Col className='oxnotedetailpage_cardheader_col'><strong>작성일자</strong></Col>
                    <Col className='oxnotedetailpage_cardheader_col'></Col>
                  </Row>
                </CardHeader>
                <CardBody className='oxnotedetailpage_cardbody'>
                  <Row>
                    <Col>01</Col>
                    <Col><Button variant='warning' size='sm' className='oxnotedetailpage_bodycardbtn'><strong className='oxnotedetail_txt'>JAVA</strong></Button></Col>
                    <Col>O</Col>
                    <Col>2023.11.06</Col>
                    <Col><Button variant='outline-dark' size='sm'>문제다시풀기</Button></Col>
                  </Row>
                  <hr/>
                  <Row>
                    <Col>02</Col>
                    <Col><Button variant='warning' size='sm' className='oxnotedetailpage_bodycardbtn'><strong className='oxnotedetail_txt'>Python</strong></Button></Col>
                    <Col>O</Col>
                    <Col>2023.11.06</Col>
                    <Col><Button variant='outline-dark' size='sm'>문제다시풀기</Button></Col>
                  </Row>
                  <hr/>
                  <Row><textarea className='oxnotedetailpage_cardbodytxt mb-3 mt-2' value={'기존에 입력한 오답노트'}></textarea></Row>
                  <Row><Button className='oxnotedetailpage_update' variant='dark'>수정</Button></Row>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
}

export default OXNoteDetailPage