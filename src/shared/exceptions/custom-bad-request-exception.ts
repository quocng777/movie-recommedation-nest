import { BadRequestException } from "@nestjs/common";
import { CustomCode } from "../constants/custom-code";
export type CustomBadReRequestExceptionProps = CustomCode

export class CustomBadReRequestException extends BadRequestException {
    customCode: number;

    constructor(
        props: CustomBadReRequestExceptionProps
    ) {
        super(props.message);
        this.customCode = props.customCode;
    };
}