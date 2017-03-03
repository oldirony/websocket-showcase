import io from 'socket.io-client';

export default io.connect(`http://${window.location.host}`);