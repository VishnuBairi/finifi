import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Invoice from '@/models/Invoice';

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    
    if (!deletedInvoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const invoice = await Invoice.findById(id);
    
    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
    
    return NextResponse.json(invoice);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    // console.log(params);
    const data = await request.json();
    
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { ...data },
      { new: true, runValidators: true }
    );
    
    if (!updatedInvoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedInvoice);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}