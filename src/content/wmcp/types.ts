export type WebMcpFieldConfig = {
    name: string;
    description: string;
  };
  
  export type WebMcpFormConfig = {
    toolname: string;
    tooldescription: string;
    fields: Record<string, WebMcpFieldConfig>;
  };
  
  export type WebMcpContent = {
    transportRequest: WebMcpFormConfig;
    contactInquiry: WebMcpFormConfig;
    jobApplication: WebMcpFormConfig;
  };