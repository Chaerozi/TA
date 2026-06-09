import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';
import crypto from 'crypto';
import prisma from '../config/db.js';

function randomCode() {
  return crypto
    .randomBytes(8)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, 10);
}

function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'water-manager-ticket',
      },

      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
}

export class TicketService {
  static async generateTicketNumber() {
    const lastTicket = await prisma.ticket.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    let nextNumber = 1;

    if (lastTicket) {
      nextNumber = parseInt(lastTicket.ticketNumber.split('-')[1]) + 1;
    }

    return `TK-${String(nextNumber).padStart(4, '0')}-${randomCode()}`;
  }

  static async createTicket(userId, body, file) {
    const ticketNumber = await this.generateTicketNumber();

    let imageUrl = null;

    if (file) {
      const uploadedImage = await uploadToCloudinary(file);

      imageUrl = uploadedImage.secure_url;
    }

    const ticket = await prisma.ticket.create({
      data: {
        ticketNumber,

        userId,

        category: body.category,

        complaint: body.complaint,

        imageUrl,

        status: 'Aktif',
      },
    });

    return ticket;
  }

  static async getMyTickets(userId) {
    const tickets = await prisma.ticket.findMany({
      where: {
        userId,
      },

      include: {
        user: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    return tickets.map((ticket) => {
      let unit = '-';

      if (ticket.user?.address) {
        const match = ticket.user.address.match(/(Unit[^,]*)/i);

        if (match) {
          unit = match[1];
        }
      }

      return {
        id: ticket.id,

        ticketNumber: ticket.ticketNumber,

        address: unit,

        category: ticket.category,

        status: ticket.status,

        createdAt: ticket.createdAt,
      };
    });
  }

  static async getAllTickets() {
    const tickets = await prisma.ticket.findMany({
      include: {
        user: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    return tickets.map((ticket) => {
      let unit = '-';

      if (ticket.user?.address) {
        const match = ticket.user.address.match(/(Unit[^,]*)/i);

        if (match) {
          unit = match[1];
        }
      }

      return {
        id: ticket.id,

        ticketNumber: ticket.ticketNumber,

        address: unit,

        category: ticket.category,

        complaint: ticket.complaint,

        imageUrl: ticket.imageUrl,

        status: ticket.status,

        createdAt: ticket.createdAt,
      };
    });
  }

  static async updateTicketStatus(ticketId) {
    return await prisma.ticket.update({
      where: {
        id: ticketId,
      },

      data: {
        status: 'Selesai',
      },
    });
  }
}
