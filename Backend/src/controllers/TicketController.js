import { TicketService } from '../services/TicketService.js';

export class TicketController {
  static async createTicket(req, res) {
    const ticket = await TicketService.createTicket(req.user.id, req.body, req.file);

    return res.json({
      status: 'success',
      data: ticket,
    });
  }

  static async getMyTickets(req, res) {
    const tickets = await TicketService.getMyTickets(req.user.id);

    return res.json({
      status: 'success',
      data: tickets,
    });
  }

  static async getAllTickets(req, res) {
    const tickets = await TicketService.getAllTickets();

    return res.json({
      status: 'success',
      data: tickets,
    });
  }

  static async completeTicket(
  req,
  res
) {

  const ticket =
    await TicketService.updateTicketStatus(
      req.params.id
    );

  return res.json({
    status: "success",
    data: ticket
  });

}
}
