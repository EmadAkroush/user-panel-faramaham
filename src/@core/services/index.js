import axios from '@axios';
import LocationService from './Location';
import PaymentService from './Payment';
import ScoreService from './Score';
import TicketService from './Ticket';
import FileService from './File';

const locationService = new LocationService(axios, 'identityprovider/api/v{version}', 1);
const paymentService = new PaymentService(axios, 'payment/api/v{version}', 1);
const scoreService = new ScoreService(axios, 'score/api/v{version}', 1);
const ticketService = new TicketService(axios, 'ticket/api/v{version}', 1);
const fileService = new FileService(axios, 'file/api/v{version}', 1);

export { locationService, paymentService, scoreService, ticketService, fileService };
