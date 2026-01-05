import mongoose from 'mongoose';

const DeletionAuditSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      required: true, // e.g. "Product"
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String, // stores deleted data title price category
      required: true,
    },
    price: {
      type: String, // stores deleted data title price category
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, // stores deleted data title price category
      required: true,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('DelAudit', DeletionAuditSchema);
