import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    assignedTo: string;
}

const TaskSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
        assignedTo: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<ITask>('Task', TaskSchema);
