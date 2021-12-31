import Link from 'next/link';

export default function Footer() {
  //Not having a footerPt1 right now
  return (
    <>
      <br />
      <br />
      <br />
      
      <div className="Footer">
        <div className="footerPt2">
          <h4>© High Definition 2021 | All Rights Reserved | Designed and Developed by <a href="https://github.com/Eesha-Jain" target="_blank" style={{color: 'lightgray', textDecoration: 'none'}}>Eesha Jain</a> from <a href="https://ftc18225.everstem.org/" target="_blank" style={{color: 'lightgray', textDecoration: 'none'}}>FTC Team #18225</a></h4>
        </div>
      </div>
    </>
  );
};