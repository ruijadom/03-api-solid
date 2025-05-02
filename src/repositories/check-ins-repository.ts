import { Prisma, CheckIn } from "generated/prisma";

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}

