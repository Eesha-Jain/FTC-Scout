import Top from './top';
import Nav from './navV1';
import Banner from './banner';

export default ({name, title, description, height}) => (
  <>
    <Top name={name} />
    <Nav name={name} />
    <Banner />
    <div className="Header" style={{height: `${height || 50}vh`}}>
      <div className="headerborder">
        <h1>{title}</h1>
        <br />
        <p>{description}</p>
        <br />
        <p>How can we make this better? Email <a href="mailto:firsttechchallengescout@gmail.com">firsttechchallengescout@gmail.com</a></p>
      </div>
    </div>
  </>
);
