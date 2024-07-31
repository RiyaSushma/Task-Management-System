
"use client";
import Sidebar from './Sidebar';
import styled from 'styled-components';

const LayoutStyled = styled.div`
  display: flex;
  height: 100vh;

  .sidebar {
    width: 250px;
    background-color: #f0f0f0;
    border-right: 1px solid #ddd;
  }

  .content {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
  }
`;

const Mainpage = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutStyled>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        {children}
      </div>
    </LayoutStyled>
  );
};

export default Mainpage;
