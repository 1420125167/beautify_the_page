import styled from 'styled-components';
import logoPic from '../../statics/logo.png';

export const Logo = styled.img.attrs({
	src: logoPic
})`
     margin-left:10px;
     height: 46px;
`;
export const HeadItem = styled.div`
    text-align: center;
    margin: 0 auto;
    height: 46px;
    line-height: 46px;
    font-size:18px;
    
`;
export const NavItem = styled.div`
    text-align: center;
    margin: 0 auto;
    line-height: 36px;
    height: 36px;
    font-size:18px;
`;
export const InputWrapper = styled.div`
    margin-top:2px;
    margin-left:30px;
`;
export const Note = styled.div`
    margin-right:0;
    font-size:28px;
    margin-top:10px;
    float:right;
    cursor:pointer;
`;
export const Msg = styled.div`
    margin-left:30px;
    font-size:28px;
    margin-top:10px;
    cursor:pointer;
`;
export const MyHome = styled.div`
    margin-right:0px;
    font-size:28px;
    margin-top:4px;
    cursor:pointer;
`;
export const SearchWrapper = styled.div`
 .global-search-wrapper {
    padding-right: 50px;
}
.global-search {
    width: 100%;
}
.global-search.ant-select-auto-complete .ant-select-selection--single {
    margin-right: -46px;
}

.global-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input:not(:last-child) {
    padding-right: 62px;
}

.global-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input-suffix {
    right: 0;
}
.global-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input-suffix button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.global-search-item {
    display: flex;
}
.global-search-item-desc {
    flex: auto;
    text-overflow: ellipsis;
    overflow: hidden;
}

.global-search-item-count {
    flex: none;
}
.headerItem{
    height: 42px;
    line-height: 42px;
    text-align: center;
    color: #000;
}
`;
export const NextNote = styled.div`
   margin-top:40px;
`;