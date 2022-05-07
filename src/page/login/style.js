import styled from 'styled-components';
import bgPic from '../../statics/login/bg.png';

export const LoginWrapper = styled.div`
   margin-top:200px;
   border:1px solid #6dc6cc;
   border-radius:4px;
   padding:30px;
   opacity:.95;
   .login-form-forgot {
    float: right;
}
 input {
    display: block;
}
`;
export const LoginLogo = styled.img`
    display:inline-block;
    float:left:
    width:40%;
`;
export const LoginTitle = styled.div`
    display:inline-block;
    margin-bottom:4px;
    font-size:20px;
    font-weight:300;
    width:40%;
`;
export const LoginBottom = styled.div`
    display:inline-block;
    width:100%;
    margin-bottom:4px;
    font-size:20px;
    font-weight:300;
    .login-form-button {
    width: 40%;
    float:left;
    }
.register-form-button {
     width: 40%;
      float:left;
      margin-left:10%;
 }
`;
export const LoginItem = styled.div`
    margin:20px 0;
    font-size:16px;
    .forget{
    display:block;
    float:right;
    }
`;
export const Wrapper = styled.div`
    width:100%;
    height:100%;
    position:fixed;
    background-image:url(${bgPic});
    filter: blur(20px);
    zoom:-1;
`;
