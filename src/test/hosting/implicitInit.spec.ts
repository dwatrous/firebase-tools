import { expect } from "chai";
import * as sinon from "sinon";

import * as fetchWebSetup from "../../fetchWebSetup";

import { init } from "../../hosting/implicitInit";

const sandbox = sinon.createSandbox();

describe("implicitInit", () => {
  beforeEach(() => {
    sandbox.stub(fetchWebSetup, "fetch").resolves({});
  });

  afterEach(() => sandbox.restore());

  it("should fetch the information about the project", async () => {
    await init({});

    sinon.assert.calledOnce(fetchWebSetup.fetch as sinon.SinonStub);
    sinon.assert.calledWithExactly(fetchWebSetup.fetch as sinon.SinonStub, {});
  });

  it("should insert the config into the js value returned", async () => {
    (fetchWebSetup.fetch as sinon.SinonStub).resolves({ foo: "bar" });
    const data = await init({});

    expect(data.js).to.contain(`"foo": "bar"`);
  });
});
