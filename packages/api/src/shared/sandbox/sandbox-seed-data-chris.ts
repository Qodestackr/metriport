import { bucket, DataEntry } from "./sandbox-seed-data-defaults";

export const chrisDocRefs: DataEntry[] = [
  {
    s3Info: {
      bucket,
      key: "chris1.xml",
    },
    docRef: {
      resourceType: "DocumentReference",
      id: "QTIyMDEzODgtQzk1RC00RkU2LTlCNzAtQTQ4MTZBMDM3NzVB",
      content: [
        {
          attachment: {
            title: "chris1.xml",
            url: "http://api.metriport.com",
            contentType: "application/xml",
            creation: "2023-06-16",
          },
        },
      ],
    },
  },
  {
    s3Info: {
      bucket,
      key: "chris2.pdf",
    },
    docRef: {
      resourceType: "DocumentReference",
      id: "QTExMDEzMjItNzg5NC0xMjM0LTFCNzAtQjM4MTZBMDM3NzVC",
      content: [
        {
          attachment: {
            title: "chris2.pdf",
            url: "http://api.metriport.com",
            contentType: "application/pdf",
            creation: "2017-10-03",
          },
        },
      ],
    },
  },
  {
    s3Info: {
      bucket,
      key: "chris3.pdf",
    },
    docRef: {
      resourceType: "DocumentReference",
      id: "QTExMDEzMjItNzg5NC1CNTQzLTFCNzAtQjM4MTZBMDM3NzVC",
      content: [
        {
          attachment: {
            title: "chris3.pdf",
            url: "http://api.metriport.com",
            contentType: "application/pdf",
            creation: "2018-12-20",
          },
        },
      ],
    },
  },
  {
    s3Info: {
      bucket,
      key: "chris4.pdf",
    },
    docRef: {
      resourceType: "DocumentReference",
      id: "QTExMDEzMjItSDM5Mi1CNTQzLTFCNzAtQjM4MTZBMDM3NzVC",
      content: [
        {
          attachment: {
            title: "chris4.pdf",
            url: "http://api.metriport.com",
            contentType: "application/pdf",
            creation: "2019-06-30",
          },
        },
      ],
    },
  },
  {
    s3Info: {
      bucket,
      key: "chris5.jpeg",
    },
    docRef: {
      resourceType: "DocumentReference",
      id: "QTExMDEzMjItSDM5Mi1CNTQzLTFCNzAtQjM4MTZBMDM3NzVD",
      content: [
        {
          attachment: {
            title: "chris5.jpeg",
            url: "http://api.metriport.com",
            contentType: "image/jpeg",
          },
        },
      ],
    },
  },
  {
    s3Info: {
      bucket,
      key: "chris6.tif",
    },
    docRef: {
      resourceType: "DocumentReference",
      id: "QTExMDEzMjItSDM5Mi1CNTQzLTFCNzAtQjM4MTZBMDM3NzZD",
      content: [
        {
          attachment: {
            title: "chris6.tif",
            url: "http://api.metriport.com",
            contentType: "image/tiff",
          },
        },
      ],
    },
  },
  {
    s3Info: {
      bucket,
      key: "chris7.jpeg",
    },
    docRef: {
      resourceType: "DocumentReference",
      id: "QTExMDEzMjItSDM5Mi1CNTQzLTFCNzAtQjM4NDZBMDM3NzZD",
      content: [
        {
          attachment: {
            title: "chris7.jpeg",
            url: "http://api.metriport.com",
            contentType: "image/jpeg",
          },
        },
      ],
    },
  },
];