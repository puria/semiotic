import React from "react"
import { mount, shallow } from "enzyme"
import OrdinalFrame from "./OrdinalFrame"
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()

const someBarData = [
  { column: "a", cats: 15 },
  { column: "a", cats: 20 },
  { column: "b", cats: 30 },
  { column: "c", cats: 100 }
]

//Enzyme doesn't do well with context so disable it for now

describe("OrdinalFrame", () => {
  it("renders", () => {
    mount(<OrdinalFrame data={someBarData} disableContext={true} />)
  })

  it("renders a <Frame>", () => {
    const wrapper = shallow(
      <OrdinalFrame data={someBarData} disableContext={true} />
    )
    expect(wrapper.find("Frame").length).toEqual(1)
  })

  it("doesn't honour pixelColumnWidth with radial projection", ()  => {
    global.console.error = jest.fn();
    shallow(<OrdinalFrame data={someBarData} pixelColumnWidth={20} projection={"radial"} />)
    expect(global.console.error).toHaveBeenCalledWith("pixelColumnWidth is not honored in radial mode")
  })

  it("works fine pixelColumnWidth on vertical", () => {
    const wrapper = shallow(<OrdinalFrame data={someBarData} pixelColumnWidth={20} projection={"vertical"} />)
    expect(wrapper.props().size[0]).toBe(20)
  })

  it("works fine pixelColumnWidth on horizontal", () => {
    const wrapper = shallow(<OrdinalFrame data={someBarData} pixelColumnWidth={20} projection={"horizontal"}/>)
    expect(wrapper.props().size[1]).toBe(20)
  })
})
