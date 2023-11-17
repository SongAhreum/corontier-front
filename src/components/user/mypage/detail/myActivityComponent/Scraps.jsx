import React,{ useEffect,useState} from 'react';
import { Table,Dropdown,Button} from 'react-bootstrap';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination'

const Scraps = ({getMenutype}) => {
  const [scraps,setScraps] = useState([]);
  const [menu,setMenu] = useState('-1');
  const size =10;
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const path = location.pathname; //navigate에서 쓸거임
  const page = parseInt(search.get('page')?search.get('page'):1);
  const navigator = useNavigate();
  const [total,setTotal] = useState(0); 

  const getScraps= async()=>{
    //내가쓴 post정보들을 가져오는 쿼리(기본값 전체 select)
    const res = await axios.get(`/mypage/scraps.list?user_id=${sessionStorage.getItem('user_id')}&menu=${menu}&page=${page}&size=${size}`)
    console.log(res.data)
    
    setScraps(res.data.list);
    setTotal(res.data.total);
  }
  useEffect(()=>{
    getScraps();
  },[location]);
  useEffect(()=>{
    getScraps();
  },[menu]);
  const handleSelect = (eventKey) => {
    // 선택된 아이템에 해당하는 값을 categ 상태로 설정
    setMenu(eventKey);
  };
  const onChangePage =(page)=>{
    navigator(`${path}?user_id=${sessionStorage.getItem('user_id')}&menu=${menu}&page=${page}&size=${size}`)
  }

  return (
    <div>
      <Dropdown onSelect={handleSelect} className='scrapspage_dropdown'>
        <Dropdown.Toggle variant="dark" id="dropdown-basic" className='post-categ-dropdownbtn'>
          {getMenutype(menu)}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="0">전체</Dropdown.Item>        
          <Dropdown.Item eventKey="1">프로젝트</Dropdown.Item>        
          <Dropdown.Item eventKey="3">라운지</Dropdown.Item>
          <Dropdown.Item eventKey="4">스터디&프로젝트(모집)</Dropdown.Item>
          <Dropdown.Item eventKey="5">Q&A</Dropdown.Item>
          <Dropdown.Item eventKey="6">교재&강의추천</Dropdown.Item>
          <Dropdown.Item eventKey="9">공모전</Dropdown.Item>
          <Dropdown.Item eventKey="7">공모전(팁)</Dropdown.Item>
          <Dropdown.Item eventKey="8">공모전(후기)</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Table className='MyActivityPageex_table text-center'>
        <thead>
          <tr>
            <th width="15%">카테고리</th>
            <th className='ellipsis1'>title</th>
            <th width="18%"></th>
            
          </tr>
        </thead>
        <tbody>
          {scraps.map(scrap=>
            <tr>
              <td>{getMenutype(String(scrap.menu_link||scrap.menu||scrap.link))}</td>
              <td><div className='activitypage_contentstitle ellipsis1'>{scrap.title}</div> </td>         
              <td><Button variant='outline-dark' size='sm' onClick={()=>{
                if((scrap.menu_link && scrap.menu_link.length>1)||scrap.link){
                  window.location.href=scrap.menu_link||scrap.link
                } else {
                  const menutype = scrap.menu_link||scrap.menu;
                  switch (menutype) {
                    case 1:
                      window.location.href=`/project/read/${scrap.post_id}`
                      break;
                    case 3:
                      window.location.href=`/community/lounge/loungeread/${scrap.post_id}`
                      break;
                    case 4:
                      window.location.href=`/community/applystudy&project/ApplyProjectRead/${scrap.post_id}`
                      break;
                    case 5:
                      window.location.href=`/community/q&a/questionread/${scrap.post_id}`
                      break;
                    case 6:
                      window.location.href=`/community/recomendcontents/textbookread${scrap.post_id}`
                      break;
                    case 7:
                      window.location.href=`/project/read/${scrap.post_id}`
                      break;
                    case 8:
                      window.location.href=`/project/read/${scrap.post_id}`
                      break;
                  }
                }
                }}>해당 게시글로 이동</Button></td>
            </tr>
            )}
        </tbody>
      </Table>
      {total >size &&
        <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={total}
          pageRangeDisplayed={10}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={ onChangePage }/>
      }    

    </div>
  )
}

export default Scraps