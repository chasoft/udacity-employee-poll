import React from "react"
import "@testing-library/jest-dom"
import { TextEncoder, TextDecoder } from "node:util"

global.TextEncoder = TextEncoder as typeof global.TextEncoder
global.TextDecoder = new TextDecoder() as unknown as typeof global.TextDecoder
