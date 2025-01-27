import { mount } from "@vue/test-utils";
import DatePicker from "../DatePicker.vue";

describe("DatePicker", () => {
  it("renders correctly", () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: null,
        placeholder: "Select date",
      },
    });
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("input").attributes("placeholder")).toBe("Select date");
  });

  it("opens calendar on input click", async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: null,
      },
    });
    await wrapper.find("input").trigger("click");
    expect(wrapper.find(".absolute.z-50").exists()).toBe(true);
  });

  it("emits update:modelValue when a date is selected", async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: null,
      },
    });
    await wrapper.find("input").trigger("click");
    await wrapper.find('.grid-cols-7 div[role="button"]').trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0][0]).toBeInstanceOf(Date);
  });

  it("formats the date correctly for mm/dd/yyyy", async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: new Date(2023, 5, 15),
        dateFormat: "mm/dd/yyyy",
      },
    });
    expect(wrapper.find("input").element.value).toBe("06/15/2023");
  });

  it("formats the date correctly for dd/mm/yyyy", async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: new Date(2023, 5, 15),
        dateFormat: "dd/mm/yyyy",
      },
    });
    expect(wrapper.find("input").element.value).toBe("15/06/2023");
  });

  it("formats the date correctly for yyyy/mm/dd", async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: new Date(2023, 5, 15),
        dateFormat: "yyyy/mm/dd",
      },
    });
    expect(wrapper.find("input").element.value).toBe("2023/06/15");
  });

  it("validates input correctly for mm/dd/yyyy", async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: null,
        dateFormat: "mm/dd/yyyy",
      },
    });
    await wrapper.find("input").setValue("13/01/2023");
    await wrapper.find("input").trigger("blur");
    expect(wrapper.find('p[role="alert"]').text()).toBe(
      "Invalid date format. Use mm/dd/yyyy."
    );
  });

  it("validates input correctly for dd/mm/yyyy", async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: null,
        dateFormat: "dd/mm/yyyy",
      },
    });
    await wrapper.find("input").setValue("32/01/2023");
    await wrapper.find("input").trigger("blur");
    expect(wrapper.find('p[role="alert"]').text()).toBe(
      "Invalid day for the selected month."
    );
  });

  it("validates input correctly for yyyy/mm/dd", async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: null,
        dateFormat: "yyyy/mm/dd",
      },
    });
    await wrapper.find("input").setValue("2023/13/01");
    await wrapper.find("input").trigger("blur");
    expect(wrapper.find('p[role="alert"]').text()).toBe("Invalid month.");
  });

  it("disables specified dates", async () => {
    const disabledDates = [new Date(2023, 5, 15)];
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: null,
        disabledDates,
      },
    });
    await wrapper.find("input").trigger("click");
    const disabledDay = wrapper.find('.grid-cols-7 div[aria-disabled="true"]');
    expect(disabledDay.exists()).toBe(true);
    expect(disabledDay.text()).toBe("15");
  });

  it("does not emit update:modelValue when a disabled date is clicked", async () => {
    const disabledDates = [new Date(2023, 5, 15)];
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: null,
        disabledDates,
      },
    });
    await wrapper.find("input").trigger("click");
    const disabledDay = wrapper.find('.grid-cols-7 div[aria-disabled="true"]');
    await disabledDay.trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });
});
