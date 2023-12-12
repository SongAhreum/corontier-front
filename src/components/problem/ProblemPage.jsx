import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { BoxContext } from '../BoxContext';

import { FaUndoAlt } from 'react-icons/fa';
import { BsCalendar2CheckFill, BsCalendar2XFill } from 'react-icons/bs';
import { RiBookmark3Fill } from 'react-icons/ri';
import { FaArrowRightLong } from "react-icons/fa6";

import { Badge, Button, Card, CardBody, CardHeader, Col, Container, Dropdown, Form, InputGroup, Row, Table, ListGroup } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import '../../css/Pagination.css';
import DonutChart from './DonutChart';

const ProblemPage = () => {
  const { setBox } = useContext(BoxContext);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [grades, setGrades] = useState([]);
  const [problems, setProblems] = useState([]);
  const [total, setTotal] = useState(0);
  const [clearData, setClearData] = useState([]);
  const [user, setUser] = useState({});
  const [clearcnt, setClearcnt] = useState({});

  const navi = useNavigate();

  const size = 10;
  const location = useLocation();
  const path = location.pathname;
  const search = new URLSearchParams(location.search);
  const page = search.get("page") ? parseInt(search.get("page")) : 1;
  const [query, setQuery] = useState(search.get("query") ? search.get("query") : "");

  const getProblems = async () => {
    setLoading(true);
    const res = await axios(`/problem/list.json?query=${query}&page=${page}&size=${size}`);
    setProblems(res.data.list);
    setTotal(res.data.total);
    setLoading(false);
  }

  const getTags = async () => {
    setLoading(true);
    const res = await axios('/problem/tag/list.json');
    setTags(res.data);
    setLoading(false);
  }

  const getGrades = async () => {
    setLoading(true);
    const res = await axios('/problem/grade/list.json');
    setGrades(res.data);
    setLoading(false);
  }

  const getClearData = async () => {
    const user_id = sessionStorage.getItem("user_id");
    setLoading(true);
    const res = await axios(`/problem/clear/${user_id}`);
    // console.log(res.data);
    setClearData(res.data.list);
    setUser(res.data.user);
    setClearcnt(res.data.clearcnt);
    setLoading(false);
  }

  const onChangePage = (page) => {
    navi(`${path}?query=${query}&page=${page}&size=${size}`);
  }

  //태그나 난이도를 선택했을 때, 2페이지를 누르면 초기화되는 문제 발생 - 시간되면 수정 필요
  const onClickTag = async (tag_id) => {
    setLoading(true);
    const res = await axios(`/problem/by_tag/${tag_id}`);
    // console.log(res.data);
    setProblems(res.data.list);
    setTotal(res.data.total);
    navi(`${path}?page=1&size=${size}`);
    setLoading(false);
  }

  const onSelectGrade = async (grade_id) => {
    setLoading(true);
    const res = await axios(`/problem/by_grade/${grade_id}`);
    // console.log(res.data);
    setProblems(res.data.list);
    setTotal(res.data.total);
    navi(`${path}?page=1&size=${size}`);
    setLoading(false);
  }

  const onSearch = async (e) => {
    e.preventDefault();
    if (query === "") {
      setBox({
        show: true,
        message: "검색어를 입력하세요."
      });
    } else {
      navi(`${path}?query=${query}&page=1&size=${size}`)
    }
  }

  const onReset = () => {
    getProblems();
  }

  const onLogin = () => {
    sessionStorage.setItem("target", location.pathname);
    window.location.href = "/user/signin";
  }

  useEffect(() => {
    getProblems();
  }, [page, query]);

  useEffect(() => {
    getTags();
    getGrades();
    getClearData();
  }, [])

  return (
    <div className='page_wrap'>
      <div className='banner'>
        <img src="../images/banner.png" alt="" />
      </div>
      <div className='page_contents_wrap'>
        <Row>
          <Col md={8}>
            <Row className='mb-3'>
              <Col>
                <Link to="/plan/starter"><img src='/images/studyplan/starterplan.png' style={{ width: "100%", borderRadius: "10px" }} /></Link>
              </Col>
              <Col>
                <img src='/images/studyplan/middleplan.png' style={{ width: "100%", borderRadius: "10px" }} />
              </Col>
              <Col>
                <img src='/images/studyplan/hardplan.png' style={{ width: "100%", borderRadius: "10px" }} />
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col md={2}>
                <Dropdown>
                  <Dropdown.Toggle className='w-100' variant="outline-primary" id="dropdown-basic">
                    난이도
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {grades.map(g =>
                      <Dropdown.Item key={g.grade_id} onClick={() => onSelectGrade(g.grade_id)}>{g.grade}</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                <form onSubmit={onSearch}>
                  <InputGroup>
                    <Form.Control value={query} placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
                    {/* <Button className='px-4' variant='secondary' type='submit'>검색</Button> */}
                  </InputGroup>
                </form>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col md={10} style={{ fontSize: "1.2rem" }}>
                {tags.map(t =>
                  <React.Fragment key={t.tag_id}>
                    <Badge className='me-2' onClick={() => onClickTag(t.tag_id)} style={{ cursor: "pointer" }}>
                      {t.tag_name}
                    </Badge>
                  </React.Fragment>
                )}
              </Col>
              <Col className='text-end' style={{ fontSize: "1.2rem" }}>
                <Badge className='px-3' size='sm' onClick={onReset} bg="secondary" style={{ cursor: "pointer" }}>초기화 <FaUndoAlt /></Badge>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table hover className='text-center'>
                  <thead>
                    <tr>
                      <th width="10%">상태</th>
                      <th>제목</th>
                      <th width="10%">난이도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {problems.map(p =>
                      <tr key={p.problem_id}>
                        <td style={{ verticalAlign: "middle", fontSize: "120%" }}>
                          {clearData.map((cd, index) => {
                            if ((cd.complete === 0) && (p.problem_id === cd.problem_id)) {
                              return <BsCalendar2XFill key={index} style={{ color: "#FA5858" }} />;
                            } else if ((cd.complete === 1) && (p.problem_id === cd.problem_id)) {
                              return <BsCalendar2CheckFill key={index} style={{ color: "#045FB4" }} />;
                            }
                            return null;
                          })}
                        </td>
                        <td style={{ verticalAlign: "middle" }} className='text-start ps-5'>
                          <div><NavLink to={`/problem/${p.problem_id}`} style={{ color: "black" }}>{p.title}</NavLink></div>
                          <div style={{ fontSize: "70%" }}>{p.tag_names}</div>
                        </td>
                        <td style={{ verticalAlign: "middle" }}>{p.grade}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Pagination
              activePage={page}
              itemsCountPerPage={size}
              totalItemsCount={total}
              pageRangeDisplayed={10}
              prevPageText={'‹'}
              nextPageText={'›'}
              onChange={onChangePage} // 이벤트 핸들러 추가
            />
          </Col>
          <Col>
            <Card>
              <CardHeader className='p-4'>
                {sessionStorage.getItem("user_id") ?
                  <h5 style={{ color: "#2E9AFE" }}>
                    {user.nickname}
                  </h5>
                  :
                  <a className='btn btn-primary w-100' onClick={onLogin}>로그인</a>
                }
              </CardHeader>
              <CardBody>
                <Card
                  bg={"dark"}
                  key={"dark"}
                  text={'white'}
                  className="mb-2"
                >
                  <CardHeader>Session</CardHeader>
                  <CardBody className='mx-3'>
                    <Row>
                      <Col>
                        <DonutChart clearcnt={clearcnt} />
                      </Col>
                      <Col md={4}>
                        <Row className='mb-2'><Col style={{ color: "#79c7e3" }}><strong>Lv.0</strong></Col><Col className='text-end'>{clearcnt.lv0}개</Col></Row>
                        <Row className='mb-2'><Col style={{ color: "#12939a" }}><strong>Lv.1</strong></Col><Col className='text-end'>{clearcnt.lv1}개</Col></Row>
                        <Row className='mb-2'><Col style={{ color: "#ef5d28" }}><strong>Lv.2</strong></Col><Col className='text-end'>{clearcnt.lv2}개</Col></Row>
                        <Row className='mb-2'><Col style={{ color: "#ff9833" }}><strong>Lv.3</strong></Col><Col className='text-end'>{clearcnt.lv3}개</Col></Row>
                        <Row className='mb-2'><Col style={{ color: "#1a3177" }}><strong>Lv.4</strong></Col><Col className='text-end'>{clearcnt.lv4}개</Col></Row>
                        <Row><Col style={{ color: "#12939a" }}><strong>Lv.5</strong></Col><Col className='text-end'>{clearcnt.lv5}개</Col></Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <hr />
                <div className='mb-3'>
                  <RiBookmark3Fill style={{ fontSize: "1.4rem" }} /> 나중에 풀어볼 문제
                </div>
                <ListGroup>
                  <ListGroup.Item variant="primary">
                    <Row>
                      <Col md={2}>
                        Lv.0
                      </Col>
                      <Col>
                        알람시계
                      </Col>
                      <Col className='text-end'>
                        풀러가기 <FaArrowRightLong />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item variant="secondary">
                    <Row>
                      <Col md={2}>
                        Lv.4
                      </Col>
                      <Col>
                        보일의 법칙
                      </Col>
                      <Col className='text-end'>
                        풀러가기 <FaArrowRightLong />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item variant="primary">
                    <Row>
                      <Col md={2}>
                        Lv.2
                      </Col>
                      <Col>
                        음식 평론가
                      </Col>
                      <Col className='text-end'>
                        풀러가기 <FaArrowRightLong />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item variant="secondary">
                    <Row>
                      <Col md={2}>
                        Lv.3
                      </Col>
                      <Col>
                        거스름돈
                      </Col>
                      <Col className='text-end'>
                        풀러가기 <FaArrowRightLong />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item variant="primary">
                    <Row>
                      <Col md={2}>
                        Lv.4
                      </Col>
                      <Col>
                        짝수 행 세기
                      </Col>
                      <Col className='text-end'>
                        풀러가기 <FaArrowRightLong />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
    </div>
  )
}

export default ProblemPage;
