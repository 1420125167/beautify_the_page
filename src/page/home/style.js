import styled from 'styled-components';
import banner from '../../statics/home/bg1.jpg';
import texture1 from '../../statics/home/t1.jpg';
import texture2 from '../../statics/home/t2.jpg';
import texture3 from '../../statics/home/t3.jpg';

export const Content = styled.div`
   margin-top:15px;
`;
export const CenterContent = styled.div`
   margin-right:10px;
   .ant-carousel .slick-slide {
    text-align: center;
    height: 280px;
    line-height: 280px;
    background: #364d79;
    overflow: hidden;
}
.ant-carousel .slick-slide h3 {
    color: #fff;
}
`;
export const RightContent = styled.div`
   margin-right:10px;
`;
export const RightNavItem1 = styled.div`
   height:40px;
   margin-top:10px;
   margin-bottom:10px;
   background-image:url(${texture1});
   background-size:cover;
   line-height:40px;
   text-align:center;
   color:#000;
`;
export const RightNavItem2 = styled.div`
   height:40px;
   margin-top:10px;
   margin-bottom:10px;
   background-image:url(${texture2});
   background-size:cover;
   line-height:40px;
   text-align:center;
   color:#000;
`;
export const RightNavItem3 = styled.div`
   height:40px;
   margin-top:10px;
   margin-bottom:10px;
   background-image:url(${texture3});
   background-size:cover;
   line-height:40px;
   text-align:center;
   color:#000;
`;
export const RightNav = styled.div`
   width:100%;
`;
export const NewsWrapper = styled.div`
    overflow:hidden;
    margin-top:20px;
`;
export const NewsTitle = styled.div`
     display:inline-block
`;
export const NewsIcon = styled.div`
  display: inline-block;
  margin-left: 80px;
  cursor: pointer;

  .spin {
    display: block;
    float: left;
    font-size: 12px;
    margin-right: 2px;
    transition: all .2s ease-in;
    transform: rotate(0deg);
    transform-origin: center center;
  }
`;
export const Banner = styled.div`
    background-image:url(${props => props.imgSrc || banner});
    background-size:cover;
`;