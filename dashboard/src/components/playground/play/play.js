import './play.css'
import Card from 'react-bootstrap/Card';

function Play() {
  return (
    <div className='container' style={{marginTop: '10px'}}>
        <Card className="mycard">
            <Card.Body >
                <Card.Title>Card Title</Card.Title>
                <hr></hr>
                <Card.Text>Hey There this is card description</Card.Text>
            </Card.Body>
        </Card>
        </div>
  );
}

export {Play};