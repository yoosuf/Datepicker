import { mount } from "@vue/test-utils";
import CalendarDay from "../CalendarDay.vue";

describe("CalendarDay", () => {
  it("renders the day of month", () => {
    const wrapper = mount(CalendarDay, {
      props: {
        date: new Date(2023, 5, 15),
        dayOfMonth: 15,
        isCurrentMonth: true,
        isSelected: false,
      },
    });
    expect(wrapper.text()).toBe("15");
  });

  it("applies correct classes based on props", () => {
    const wrapper = mount(CalendarDay, {
      props: {
        date: new Date(2023, 5, 15),
        dayOfMonth: 15,
        isCurrentMonth: true,
        isSelected: true,
      },
    });
    expect(wrapper.classes()).toContain("bg-gray-900");
    expect(wrapper.classes()).toContain("text-white");
  });

  it("emits select event on click", async () => {
    const wrapper = mount(CalendarDay, {
      props: {
        date: new Date(2023, 5, 15),
        dayOfMonth: 15,
        isCurrentMonth: true,
        isSelected: false,
      },
    });
    await wrapper.trigger("click");
    expect(wrapper.emitted("select")).toBeTruthy();
    expect(wrapper.emitted("select")![0]).toEqual([
      {
        date: new Date(2023, 5, 15),
        dayOfMonth: 15,
        isCurrentMonth: true,
      },
    ]);
  });
});
