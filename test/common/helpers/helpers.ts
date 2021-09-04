import initDBConnection from '../../../server/src/controllers/mongoDB.controller';
import mongoose from 'mongoose';
import Member from '../../../server/src/models/member.model';
import FinanceAccount from '../../../server/src/models/financeAccount.model';
import RegisteredUser from '../../../server/src/models/registered.user.model';

export async function setup(member): Promise<void> {
    initDBConnection();
    await Member.create(member);
    mongoose.disconnect();
}

export async function teardown(email: string): Promise<void> {
    initDBConnection();

    await Member.findOneAndDelete({ email });
    await FinanceAccount.findOneAndDelete({ email });
    await RegisteredUser.findOneAndDelete({ email });

    mongoose.disconnect();
}
