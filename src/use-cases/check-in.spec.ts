import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    // sut: system under test
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });


    expect(checkIn.id).toEqual(expect.any(String));
    expect(checkIn.gym_id).toEqual("gym-01");
    expect(checkIn.user_id).toEqual("user-01");
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await expect(
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));


      const { checkIn } = await sut.execute({
        gymId: "gym-01",
        userId: "user-01",
      })

      expect(checkIn.id).toEqual(expect.any(String));
      expect(checkIn.gym_id).toEqual("gym-01");
      expect(checkIn.user_id).toEqual("user-01");


  });
});