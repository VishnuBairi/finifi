import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
    trim: true
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Open', 'Awaiting Approval', 'Approved', 'Processing', 'Paid', 'Rejected', 'Vendor Not Found', 'Duplicate', 'Void'],
    default: 'Open'
  },
  netAmount: {
    type: Number,
    required: true
  },
  invoiceDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  poNumber: {
    type: String,
    required: true,
    trim: true
  },
  createdTime: {
    type: String,
    required: true
  },
  createdDate: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);

export default Invoice;