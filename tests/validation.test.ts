import assert from "node:assert/strict";
import test from "node:test";
import { identifyDocument } from "../lib/validation.ts";
test("accepts a complete PDF signature", () => assert.equal(identifyDocument("brief.pdf", "application/pdf", Buffer.from("%PDF-1.7\nhello\n%%EOF")), "pdf"));
test("rejects encrypted PDFs", () => assert.throws(() => identifyDocument("brief.pdf", "application/pdf", Buffer.from("%PDF-1.7\n/Encrypt\n%%EOF")), /Password-protected/));
test("accepts a DOCX zip signature", () => assert.equal(identifyDocument("brief.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", Buffer.from([0x50, 0x4b, 0x03, 0x04])), "docx"));
