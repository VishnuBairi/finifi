import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Invoice from '@/models/Invoice';

export async function GET(request) {
    try {
      await connectDB();
      
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page')) || 1;
      const limit = parseInt(searchParams.get('limit')) || 10;
      const status = searchParams.get('status');
      const search = searchParams.get('search');
      const sortField = searchParams.get('sortField') || 'createdAt';
      const sortOrder = searchParams.get('sortOrder') || 'desc';
  
      let query = {};
      
      if (status && status !== 'All') {
        query.status = status;
      }
  
      if (search) {
        query.$or = [
          { vendorName: { $regex: search, $options: 'i' } },
          { invoiceNumber: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } }
        ];
      }
  
      const skip = (page - 1) * limit;
  
      const sort = {
        [sortField]: sortOrder === 'asc' ? 1 : -1
      };

      const invoices = await Invoice.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);
  

      const total = await Invoice.countDocuments(query);
  
      const totalPages = Math.ceil(total / limit);
  
      return NextResponse.json({
        invoices,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          limit
        }
      });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    // console.log(data);
    
    const invoice = new Invoice({
      ...data,
      createdTime: new Date(),
      createdDate: new Date()
    });
    // console.log(invoice);
    
    await invoice.save();
    // console.log(NextResponse.json(invoice));
    return NextResponse.json(invoice, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
